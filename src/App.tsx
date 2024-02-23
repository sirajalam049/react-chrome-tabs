import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

import SortableItem from './SortableItem';

let counter = 0

function App() {
	const [items, setItems] = useState<Array<number>>([counter++]);
	const [active, setActive] = useState(-1);
    const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: { distance: 5}}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
	);
	
	
  const addItem = () => {
    const newId = counter++
    if (active == -1) {
        setActive(newId)
    }
    setItems([...items, newId])
  }

  const removeItem = (id: number) => {
    setItems(items.filter(x => x != id))
    if (active === id) {
      setActive(items[0] || -1) 
    }
  }

  useEffect(() => {
    if (!items.includes(active)) {
      setActive(items[0] || -1)
    }
  }, [items.length])

  return (
    <div style={{padding: '100px 100px'}} >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={items}
          strategy={horizontalListSortingStrategy}
        >
          <div style={{ display: "flex", backgroundColor: '#dee1e6', borderRadius: '5px 5px 0px', padding: '8px 3px 4px', position: 'relative' }} >
				{items.map(id => (
					<SortableItem onRemove={removeItem} onMouseDown={() => {setActive(id)}} isActive={id === active} key={id} id={id} />
        ))}
            <button onClick={addItem} >+</button>
			      <div style={{width: '100%', backgroundColor: '#fff', height: 4, position: 'absolute', left: 0, right: 0,bottom: 0, borderBottom: '1px Solid #dee1e6'}} />
          </div>
        </SortableContext>
		  </DndContext>
    </div>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
export default App