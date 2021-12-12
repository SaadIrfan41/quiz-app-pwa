import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function decodestring(str: string) {
  const text = document.createElement('textarea')
  text.innerHTML = str
  return text.value
}
const QuizFormData = ({ quiz, name }: any) => {
  const [showscore, setshowscore] = useState(false)
  const [score, setscore] = useState(0)
  const [selected, setselected] = useState(false)
  const [questionnumber, setquestionnumber] = useState(0)

  const handelCheck = (option: string[]) => {
    setselected(true)
    if (option === quiz[questionnumber].correct_answer) {
      setscore(score + 1)
    }
  }
  const nextquestion = () => {
    if (questionnumber >= 9) {
      setquestionnumber(0)
      setshowscore(true)

      return
    } else {
      setquestionnumber(questionnumber + 1)
      setselected(false)
    }
  }

  return (
    <div>
      <Image
        className='z-0'
        src='/questionmark.jpg'
        alt='Picture of the author'
        layout='fill'
      />
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 '>
        <div className='sm:mx-auto sm:w-full sm:max-w-md z-1 relative'>
          <h2 className='mt-6 mb-4 underline text-center text-3xl font-extrabold text-indigo-600 hover:text-indigo-500 cursor-default'>
            Welcome To The Quiz App {name.toUpperCase()}
          </h2>
        </div>

        <div className=' sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 z-1 relative'>
            {showscore ? (
              <div>
                <div className='font-bold text-xl underline flex justify-center text-indigo-600 cursor-default'>
                  {name.toUpperCase()} You scored {score} out of 10
                </div>
                <Link href='/'>
                  <a className=' mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Play Again
                  </a>
                </Link>
              </div>
            ) : (
              <>
                <span className='flex justify-end text-indigo-700 underline font-bold'>
                  Score:{score}
                </span>
                <div className='flex justify-center text-xl underline'>
                  Question #{questionnumber + 1}
                </div>

                <div className='space-y-6'>
                  <div className='flex justify-center underline '>
                    Q:{decodestring(quiz[questionnumber].question)}
                  </div>
                  {quiz[questionnumber].option.map(
                    (options: Array<string>, key: number) => {
                      return (
                        <div key={key} className='mt-1'>
                          <input
                            type='button'
                            disabled={selected}
                            onClick={() => handelCheck(options)}
                            defaultValue={options}
                            className={` disabled:opacity-70 ${
                              options === quiz[questionnumber].correct_answer
                                ? 'focus-within:bg-green-500 bg-green'
                                : 'focus-within:bg-red-500'
                            }  appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          />
                        </div>
                      )
                    }
                  )}

                  <div>
                    <button
                      onClick={() => nextquestion()}
                      disabled={!selected}
                      className='disabled:opacity-70  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Next Question
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizFormData
