import React from 'react'
import { useDispatch } from 'react-redux'
import { showRightPanel } from '../../redux/actions/document_viewer'
import { useRouter } from 'next/router';

export default () => {
  const dispatch = useDispatch()
  const router = useRouter()
  return <div className="flex justify-end">
    <div className="w-16 bg-white">
      <div className="bg-indigo-100 w-8 h-8 rounded m-auto mt-4 flex item-center" onClick={() => dispatch(showRightPanel())}><IconInfo /></div>
      <div className="bg-indigo-100 w-8 h-8 rounded m-auto mt-4 flex item-center"> <IconNotification /> </div>

      <footer className="border-b py-4 border-none  ">
        <div className=" m-auto h-8 w-8 bg-white border border-indigo-500 rounded-full mr-24 flex  hover:border-indigo-500 " onClick={() => {
          router.push("/v/load_file")
        }}> <IconAdd /></div>
        <div className="h-8 w-8 bg-indigo-500 border border-indigo-500 rounded-full mr-6 flex shadow hover:bg-indigo-700"> <IconSearch /></div>
      </footer>

    </div>
  </div>
}

const IconNotification = () => (
  <svg style={{ margin: 'auto' }} width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.8145 5.52857C11.8145 4.42458 11.3703 3.3658 10.5797 2.58516C9.78915 1.80453 8.71689 1.36597 7.59883 1.36597C6.48078 1.36597 5.40852 1.80453 4.61793 2.58516C3.82735 3.3658 3.3832 4.42458 3.3832 5.52857C3.3832 10.3849 1.27539 11.7725 1.27539 11.7725H13.9223C13.9223 11.7725 11.8145 10.3849 11.8145 5.52857Z" stroke="#5E81F4" stroke-width="1.56098" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.8148 14.5476C8.69128 14.7579 8.51398 14.9324 8.30065 15.0537C8.08733 15.1751 7.84547 15.2389 7.59929 15.2389C7.35312 15.2389 7.11126 15.1751 6.89794 15.0537C6.68461 14.9324 6.50731 14.7579 6.38379 14.5476" stroke="#5E81F4" stroke-width="1.56098" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

)

const IconInfo = () => (

  <svg className="m-auto" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.39014 13.6342C10.8386 13.6342 13.634 10.8387 13.634 7.39025C13.634 3.94184 10.8386 1.14635 7.39014 1.14635C3.94173 1.14635 1.14624 3.94184 1.14624 7.39025C1.14624 10.8387 3.94173 13.6342 7.39014 13.6342Z" stroke="#667EEA" stroke-width="1.56098" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.38989 9.88782V7.39026" stroke="#667EEA" strokeWidth="1.56098" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.38989 4.8927H7.39672" stroke="#667EEA" strokeWidth="1.56098" strokeLinecap="round" strokeLinejoin="round" />
  </svg>


)

const IconAdd = () => (
  <svg style={{ margin: 'auto' }} width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clipRule="evenodd" d="M15.9014 9.29537H10.9469V4.34082H9.29537V9.29537H4.34082V10.9469H9.29537V15.9014H10.9469V10.9469H15.9014V9.29537V9.29537Z" fill="#667EEA" />
  </svg>

)

const IconSearch = () => (
  <svg  style={{ margin: 'auto' }} width="15" height="15" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M15.0664 9.47708C17.406 9.47708 19.2777 11.3301 19.2777 13.6464C19.2777 14.4617 19.0438 15.2307 18.632 15.87L21.5144 18.7422L20.2136 20.0301L17.2937 17.1857C16.648 17.5841 15.8806 17.8157 15.0664 17.8157C12.7267 17.8157 10.855 15.9627 10.855 13.6464C10.855 11.3301 12.7267 9.47708 15.0664 9.47708ZM15.0664 11.3301C14.4458 11.3301 13.8507 11.5741 13.412 12.0085C12.9732 12.4429 12.7267 13.0321 12.7267 13.6464C12.7267 14.2607 12.9732 14.8499 13.412 15.2843C13.8507 15.7187 14.4458 15.9627 15.0664 15.9627C15.6869 15.9627 16.282 15.7187 16.7207 15.2843C17.1595 14.8499 17.406 14.2607 17.406 13.6464C17.406 13.0321 17.1595 12.4429 16.7207 12.0085C16.282 11.5741 15.6869 11.3301 15.0664 11.3301ZM18.6694 5.79881C21.1026 5.97485 23.0212 7.95759 23.0212 10.4036C23.0212 11.9231 22.2818 13.2758 21.1494 14.1097V13.6464C21.1494 12.8555 20.9921 12.0724 20.6864 11.3417C20.3807 10.6111 19.9326 9.94718 19.3677 9.38795C18.8029 8.82872 18.1323 8.38512 17.3943 8.08247C16.6562 7.77982 15.8652 7.62404 15.0664 7.62404C13.453 7.62404 11.9058 8.25854 10.765 9.38795C9.62417 10.5174 8.98327 12.0492 8.98327 13.6464C8.98327 14.1097 9.03943 14.5729 9.14237 15.0362H6.1757C4.68647 15.0362 3.25823 14.4505 2.20519 13.408C1.15214 12.3654 0.560547 10.9514 0.560547 9.47708C0.560547 6.60488 2.75046 4.25153 5.56739 3.94578C6.16147 2.82013 7.05556 1.87704 8.15267 1.21881C9.24978 0.560585 10.508 0.21236 11.7909 0.211915C13.4133 0.211127 14.9859 0.767596 16.2402 1.78642C17.4946 2.80524 18.3531 4.22332 18.6694 5.79881V5.79881Z" fill="white"/>
  </svg>

)
