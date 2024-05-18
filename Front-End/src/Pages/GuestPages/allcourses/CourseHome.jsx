import React from 'react';

import Back from '../common/back/Back';
import CoursesCard from './CoursesCard';
import OnlineCourses from './OnlineCourses';

const CourseHome = () => {
  return (
    <>
      <Back title='Popular Tutorials' />
      <CoursesCard />
      <OnlineCourses />
    </>
  )
}

export default CourseHome
