import { FeedbackProps } from '../types'

const SystemFeedback = ({ message, success }: FeedbackProps) => {
  const bgColor = success ? 'bg-green-50' : 'bg-red-50';
  const borderColor = success ? 'border-green-700' : 'border-red-700';
  const textColor = success ? 'text-green-700' : 'text-red-700';

  return (
    <section className={`border rounded-md mb-2 p-3 ${bgColor} ${borderColor}`}>
      <h2 className={`text-center ${textColor}`}>{message}</h2>
    </section>
  )
}

export default SystemFeedback;