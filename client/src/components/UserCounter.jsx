export default function UserCounter({ count }) {
  return (
    <div className="user-counter">
      <div className="pulse-dot" />
      <span>{count} {count === 1 ? "user" : "users"} online</span>
    </div>
  );
}
