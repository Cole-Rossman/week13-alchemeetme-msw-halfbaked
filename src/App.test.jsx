// When in doubt check the docs!
// 🚨🚨 https://mswjs.io/docs/ 🚨🚨

import { screen, render } from '@testing-library/react'
// 🚨
// import rest
import { rest } from 'msw'
// import setupServer
import App from './App'
import { server } from './setupTests'
import { user, sasuke } from './services/characterData'


test('Should render the header', async () => {
  render(<App />)
  const banner = screen.getByRole('banner')
  const headerImg = screen.getByAltText(/alchemy/i)
  const profileName = await screen.findByText(user.name)

  expect(banner).toHaveStyle({
    background: 'var(--grey)',
  })
  expect(headerImg).toBeInTheDocument()
  expect(profileName).toBeInTheDocument()
})

test('Should render the header with Sasuke 🌬️🔥', async () => {
  // 🚨 Use the server to change the response for this test
  server.use(
    rest.get(`${process.env.REACT_APP_SUPABASE_URL}/rest/v1/users`, (req, res, ctx) => 
      res(ctx.json([ sasuke ]))
    )
  )
  render(<App />)

  const profileName = await screen.findByText(sasuke.name)

  expect(profileName).toBeInTheDocument()
})
