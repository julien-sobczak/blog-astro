export default function Expandable({ title, tag = undefined, collapsed = true, children }) {
  return (
    <div className="Expandable">
      <details open={!collapsed}>
        <summary><span dangerouslySetInnerHTML={{ __html: title }} /> {tag && <span className="ExpandableTag">{tag}</span>}</summary>
        {/* Content rendered when uncollapsed */}
        <div className="expandable-content">
          {children}
        </div>
      </details>
    </div>
  );
}