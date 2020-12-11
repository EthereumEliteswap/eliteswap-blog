import React, { useState } from 'react'
import InlineCard from './inlineCard'

import styled from 'styled-components'

const links = [
]

const StyledWizard = styled.div`
  color: ${({ theme, outlined }) => (outlined ? theme.colors.link : theme.textColor)};
  width: 100%;
  max-width: 720px;
  /* border: 1px solid ${({ theme }) => theme.colors.grey2}; */
  border-radius: 20px;
  /* overflow: hidden; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 960px) {
    width: 100%;
    max-width: 450px;
    margin: 1rem 0;
    /* height: ${({ small }) => !small && '200px'}; */
    /* height: 200px; */
  }
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* padding: 1.5rem; */
  /* overflow-x: scroll;
  overflow-y: visible;
  *::-webkit-scrollbar {
    display: none;
  } */
`

const Wizard = () => {
  const [currentCategory] = useState('Developers')

  return (
    <StyledWizard>
      <CardWrapper>
        {links
          .filter(category => {
            return category.name === currentCategory
          })
          .map(category => {
            return category.sublinks.map((sublink, i) => {
              return (
                <InlineCard
                  key={i}
                  title={sublink.title}
                  desc={sublink.description}
                  to={sublink.link}
                  tag={sublink.tag}
                  icon={sublink.icon}
                />
              )
            })
          })}
      </CardWrapper>
    </StyledWizard>
  )
}

export default Wizard
