export default function ConnectButton() {
  return (
    <button
      className="p-5 rounded-lg bg-slate-500"
      onClick={() => {
        alert('connect metamask');
      }}
    >
      Connext
    </button>
  );
}
