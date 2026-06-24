import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('all desktop nav links navigate to correct pages', async ({ page }) => {
    const links = [
      { label: 'Properties', url: '/properties' },
      { label: 'Services', url: '/services' },
      { label: 'Investors', url: '/investors' },
      { label: 'News', url: '/news' },
      { label: 'About', url: '/about' },
      { label: 'Contact', url: '/contact' },
    ]

    for (const { label, url } of links) {
      const link = page.locator('header nav a', { hasText: label })
      await expect(link).toBeVisible()
      await link.click()
      await expect(page).toHaveURL(url)
      await page.goBack()
    }
  })

  test('clicking brand logo goes to homepage', async ({ page }) => {
    await page.goto('/properties')
    const logo = page.locator('header a[aria-label="Legitimate Properties home"]')
    await logo.click()
    await expect(page).toHaveURL('/')
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    const menuButton = page.locator('header button[aria-label="Toggle menu"]')
    await expect(menuButton).toBeVisible()
    await menuButton.click()
    const mobileNav = page.locator('header nav').filter({ has: page.locator('a[href="/about"]') })
    await expect(mobileNav).toBeVisible()
    await menuButton.click()
  })

  test('mobile menu links navigate correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    const menuButton = page.locator('header button[aria-label="Toggle menu"]')
    await menuButton.click()
    const contactLink = page.locator('header nav a', { hasText: 'Contact' })
    await contactLink.click()
    await expect(page).toHaveURL('/contact')
  })
})
