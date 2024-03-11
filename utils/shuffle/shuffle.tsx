interface ShuffleOptions {
  iterations: number
  fps: number
  onComplete: (elm: HTMLElement) => void
}

export async function shuffle(
  elements: HTMLElement[],
  options: ShuffleOptions
) {
  const module = await import("shuffle-letters")
  const shuffleLetters = module.default as unknown as (
    element: HTMLElement,
    options: ShuffleOptions
  ) => void

  elements.forEach((element: HTMLElement) => {
    shuffleLetters(element, options)
  })
}
