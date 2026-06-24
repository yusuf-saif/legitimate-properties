import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders hero section with carousel', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
    const heading = hero.locator('h1')
    await expect(heading).toBeVisible()
    const headings = await heading.allTextContents()
    expect(headings.length).toBe(1)
    expect(headings[0].length).toBeGreaterThan(0)
  })

  test('hero carousel has dot navigation', async ({ page }) => {
    const dots = page.locator('button[aria-label^="Go to slide"]')
    const count = await dots.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('hero CTA buttons navigate correctly', async ({ page }) => {
    const exploreBtn = page.getByText('Explore Properties')
    await expect(exploreBtn).toBeVisible()
    await exploreBtn.click()
    await expect(page).toHaveURL(/\/properties/)
  })

  test('featured properties section loads when properties exist', async ({ page }) => {
    const featuredSection = page.locator('section').filter({ has: page.locator('h2', { hasText: 'Featured' }) })
    const exists = (await featuredSection.count()) > 0
    if (exists) {
      const propertyCards = featuredSection.locator('a[href^="/properties/"]')
      const count = await propertyCards.count()
      expect(count).toBeGreaterThanOrEqual(1)
    }
  })

  test('nav bar displays logo', async ({ page }) => {
    const logo = page.locator('header img[alt="Legitimate Properties"]')
    await expect(logo).toBeVisible()
  })

  test('footer renders and contains links', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    const privacyLink = footer.getByText('Privacy Policy')
    await expect(privacyLink).toBeVisible()
  })
})
