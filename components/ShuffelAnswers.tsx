export const quizDetails = async (totalQues: number, level: string) => {
  let shuffleArry = (array: any[]) => [...array].sort(() => Math.random() - 0.5)

  const res = await fetch(
    `https://opentdb.com/api.php?amount=${totalQues}&category=9&difficulty=${level}&type=multiple`
  )
  let { results } = await res.json()
  // console.log(results)
  const quiz: any[] = results.map((v: any) => {
    return {
      question: v.question,
      answer: v.correct_answer,
      correct_answer: v.correct_answer,
      option: shuffleArry(v.incorrect_answers.concat(v.correct_answer)),
    }
  })

  return quiz
}
