import { useState, useEffect } from 'react';
import ExamContainer from './ExamContainer';


/**
 * Root assessment view containing information about the assessment to be taken and options to start it
 */
export default function AssessmentContainer() {

  // Return component
  return (
    <>
      <h1>Assessment Container</h1>
      <ExamContainer/>
    </>
  )
}
