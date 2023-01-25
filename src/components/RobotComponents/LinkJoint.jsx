import React from 'react'
import SquareRod from './Links/SquareRod'
import Revolute from './Joints/Revolute'
import Prismatic from './Joints/Prismatic'

const linkJoint = ({ robotParam }) => {

  const renderLink = () => {
    if (robotParam.link === "square") return <SquareRod robotParam={robotParam} />;
  }

  const renderJoint = () => {
    if (robotParam.joint === "revolute") return <Revolute robotParam={robotParam} />;
    else if (robotParam.joint === "prismatic") return <Prismatic robotParam={robotParam} />;
  }

  return (
    <>
      {renderLink()}
      {renderJoint()}
    </>
  )
}

export default linkJoint;