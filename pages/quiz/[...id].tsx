import useAxios from 'axios-hooks'
import QuizFormData from '../../components/QuizFormData'

type QuestionType = {
  question: string
  answer: string
  option: string[]
  correct_answer: string
  incorrect_answers: string[]
}

let shuffleArry = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

const QuizData = ({ data }: any) => {
  const [{ data: quizdata, loading, error }] = useAxios(
    `https://opentdb.com/api.php?amount=10&difficulty=${data[2].toLowerCase()}&category=${parseInt(
      data[1]
    )}&type=multiple`
  )
  if (loading) return <h1>Loading</h1>
  if (error) return <h1>Error</h1>
  console.log(quizdata.results)
  const quiz = quizdata.results.map((v: QuestionType) => {
    return {
      question: v.question,

      correct_answer: v.correct_answer,
      option: shuffleArry(v.incorrect_answers.concat(v.correct_answer)),
    }
  })
  console.log(quiz)

  return <QuizFormData quiz={quiz} name={data[0]} />
}

export async function getServerSideProps({ params }: any) {
  // Call external API from here directly
  const data = params.id

  return {
    props: { data: data },
  }
}

export default QuizData
