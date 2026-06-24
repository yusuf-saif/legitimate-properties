import { test, expect } from '@playwright/test'

test.describe('News', () => {
  test('news listing page loads', async ({ page }) => {
    await page.goto('/news')
    await expect(page).toHaveTitle(/News/)
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('news article cards render when posts exist', async ({ page }) => {
    await page.goto('/news')
    const cards = page.locator('a[href^="/news/"]')
    const count = await cards.count()
    if (count > 0) {
      await expect(cards.first()).toBeVisible()
    } else {
      const emptyMessage = page.getByText(/no articles/i)
      await expect(emptyMessage).toBeVisible()
    }
  })

  test('news article detail page loads with content', async ({ page }) => {
    await page.goto('/news')
    const articleLink = page.locator('a[href^="/news/"]').first()
    const exists = (await articleLink.count()) > 0
    test.skip(!exists, 'No news articles to test')

    await articleLink.click()
    await page.waitForURL(/\/news\//)

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text?.length).toBeGreaterThan(0)
  })
})
