const FloatingItems: React.FC<{ items: string[] }> = ({ items }) => {
  const positions = [
    { top: '20%', left: '15%' },
    { top: '30%', right: '15%' },
    { top: '55%', left: '5%' },
    { bottom: '25%', right: '10%' },
  ]

  return items.map((item, index) => {
    const position = positions[index % positions.length]
    return (
      <div
        key={ index }
        className="absolute text-4xl animate-float"
        style={ {
          top: position.top,
          left: position.left || 'auto',
          right: position.right || 'auto',
          bottom: position.bottom || 'auto',
          animationDuration: `${ Math.random() * 5 + 3 }s`,
        } }
      >
        { item }
      </div>
    )
  })
}

export default FloatingItems