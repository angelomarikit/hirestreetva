type Props = {
  message: string
  tone?: 'success' | 'error'
}

export function SaveToast({ message, tone = 'success' }: Props) {
  if (!message) return null
  return (
    <p
      className={`fixed bottom-6 right-6 z-[100] rounded-full px-5 py-3 text-sm font-medium shadow-xl ${
        tone === 'success' ? 'bg-rose text-white' : 'bg-red-600 text-white'
      }`}
    >
      {message}
    </p>
  )
}
