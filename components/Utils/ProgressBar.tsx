type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round(( current / total ) * 100)
  return (
    <div className="w-full mx-auto mb-6 flex flex-col items-center px-4 md:px-0">
      <div className="relative w-full max-w-md bg-gray-200 rounded-full h-2">
        <div
          className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
          style={ { width: `${ percentage }%` } }
        ></div>
        <span
          className="absolute -right-4 -top-3 text-3xl"
          style={ { animationDuration: '5s' } }
        >
          🥺
        </span>
      </div>
      <p className="text-center text-md text-gray-500">
        Question { current } of { total }
      </p>
    </div>
  )
}

export default ProgressBar
