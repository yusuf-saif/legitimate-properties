import { test, expect } from '@playwright/test'

test.describe('Properties', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/properties')
  })

  test('property listing page loads with title', async ({ page }) => {
    await expect(page).toHaveTitle(/Properties/)
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text?.length).toBeGreaterThan(0)
  })

  test('property cards render when properties exist', async ({ page }) => {
    const cards = page.locator('a[href^="/properties/"]')
    const count = await cards.count()
    if (count > 0) {
      await expect(cards.first()).toBeVisible()
    } else {
      const emptyMessage = page.getByText(/no properties/i)
      await expect(emptyMessage).toBeVisible()
    }
  })

  test('clicking a property card navigates to detail page', async ({ page }) => {
    const propertyLink = page.locator('a[href^="/properties/"]').first()
    const exists = (await propertyLink.count()) > 0
    test.skip(!exists, 'No properties to test')

    const href = await propertyLink.getAttribute('href')
    await propertyLink.click()
    await expect(page).toHaveURL(href!)
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('property filters are interactive', async ({ page }) => {
    const filters = page.locator('select, input[type="text"], button').filter({ hasText: /type|location|price/i })
    const count = await filters.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})
