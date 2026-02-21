export default function UserCounter({ count }) {
  return (
    <div className="user-counter">
      <div className="pulse-dot" />
      <span>{count} {count === 1 ? "usuário" : "usuários"} online</span>
    </div>
  );
}
