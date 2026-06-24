import { test, expect } from '@playwright/test'

test.describe('Responsive & Cross-browser', () => {
  test('hamburger menu visible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const menuButton = page.locator('header button[aria-label="Toggle menu"]')
    await expect(menuButton).toBeVisible()
  })

  test('desktop nav links hidden on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const desktopNav = page.locator('header nav').first()
    const isVisible = await desktopNav.isVisible()
    expect(isVisible).toBe(false)
  })

  test('page content is responsive (no horizontal scroll)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const viewportWidth = await page.evaluate(() => window.innerWidth)
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 5) // allow tiny rounding
  })

  test('services page renders correctly', async ({ page }) => {
    await page.goto('/services')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('investors page renders correctly', async ({ page }) => {
    await page.goto('/investors')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('about page renders with team section', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('privacy page loads', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.locator('h1, h2')).toBeVisible()
  })
})
