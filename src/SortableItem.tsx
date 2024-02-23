import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

const data = [
  { text: 'Facebook', logo: 'https://adamschwartz.co/chrome-tabs/demo/images/facebook-favicon.ico' },
  { text: 'Google', logo: 'https://adamschwartz.co/chrome-tabs/demo/images/google-favicon.ico' },
  { text: 'Twitter', logo: 'https://abs.twimg.com/favicons/twitter.3.ico' }
]
  
const unselectable = {
    'WebkitTouchCallout': 'none',
    'WebkitUserSelect': 'none',
    'KhtmlUserSelect':'none',
    'MozUserSelect': 'none',
    'msUserSelect': 'none',
    'userSelect': 'none',
}

export function SortableItem({id, isActive, onRemove, ...restProps}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });


  const [tabHover, setTabHover] = useState(false)
  const [closeHover, setCLoseHover] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const tabStyle = {
    flex: 1,
    maxWidth: 200,
    padding: '9px 6px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: tabHover ? '#f4f6f8' : 'transparent',
    transition: 'ease-in-out',
    borderRadius: '5px 5px 0px 0px',
    minWidth: 24
  }

  const textContainer = {
    color: '#45474a',
    fontSize: 12,
    marginLeft: 8,
    textWrap: 'no-wrap',
    overflow: 'ellipsis',
    flex: 1
  }

  const activeTab = {
    backgroundColor: '#fff',
    zIndex: 5
  }

  return (
    <div
      {...restProps}
      onMouseEnter={e => setTabHover(true)}
      onMouseLeave={e => setTabHover(false)}
      ref={setNodeRef}
      style={{ ...style, ...tabStyle, ...(isActive ? activeTab : {}), ...unselectable }}
      {...attributes}
      {...listeners}
    >
      {data[id - 1]?.logo ? <img height={16} src={data[id - 1]?.logo} /> : null}
      <div style={{ ...textContainer }} >{data[id - 1]?.text || "New Tab"}</div>
      <div style={{
        fontSize: 12,
        height: 16, width: 16, borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: closeHover ? '#dee1e5' : 'transparent',
        transition: 'ease-in-out',
        padding: 2
      }}
      onMouseEnter={e => setCLoseHover(true)}
      onMouseLeave={e => setCLoseHover(false)}
        
        onClick={() => onRemove(id)} >&#10005;</div>
    </div>
  );
}

export default SortableItem