interface IPinkButton {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => any;
}

export default function PinkButton({ children, disabled, onClick }: IPinkButton) {
  return (
    <button
      className="w-40 flex justify-center bg-pink-200 rounded-[28px] py-2 px-3 hover:bg-pink-300 disabled:bg-pink-100 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  )
}