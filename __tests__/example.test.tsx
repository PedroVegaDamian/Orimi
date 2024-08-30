import { fireEvent, render, screen } from '@testing-library/react'
import { Title } from '@/components/ui/Title'

test('Title component', () => {
  const handleClick = vi.fn()

  render(
    <Title className="other-class" onClick={handleClick}>
      Nuevo Título
    </Title>
  )

  const element = screen.getByRole('heading', { level: 3 })

  fireEvent.click(element)
  fireEvent.click(element)

  expect(handleClick).toHaveBeenCalledTimes(2)
  expect(element).toBeTruthy()
})
