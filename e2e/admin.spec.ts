import { test, expect } from '@playwright/test'

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin')
  })

  test('admin dashboard loads with stats', async ({ page }) => {
    await expect(page).toHaveTitle(/Admin/)
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('admin navigation links are present', async ({ page }) => {
    const links = page.locator('nav a')
    const linkLabels = ['Dashboard', 'Properties', 'News', 'Team']
    for (const label of linkLabels) {
      await expect(page.locator('nav a', { hasText: label })).toBeVisible()
    }
  })

  test('admin properties list loads', async ({ page }) => {
    await page.locator('nav a', { hasText: 'Properties' }).click()
    await page.waitForURL('/admin/properties')
    const heading = page.locator('h1, h2')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toContain('Properties')
  })

  test('admin news list loads', async ({ page }) => {
    await page.locator('nav a', { hasText: 'News' }).click()
    await page.waitForURL('/admin/news')
    const heading = page.locator('h1, h2')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toContain('News')
  })

  test('admin team list loads', async ({ page }) => {
    await page.locator('nav a', { hasText: 'Team' }).click()
    await page.waitForURL('/admin/team')
    const heading = page.locator('h1, h2')
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text).toContain('Team')
  })

  test('add property page has form fields', async ({ page }) => {
    await page.goto('/admin/properties/new')
    const inputs = page.locator('input, textarea, select')
    const count = await inputs.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('add news page has form fields', async ({ page }) => {
    await page.goto('/admin/news/new')
    const inputs = page.locator('input, textarea, select')
    const count = await inputs.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })

  test('add team member page has form fields', async ({ page }) => {
    await page.goto('/admin/team/new')
    const inputs = page.locator('input, textarea, select')
    const count = await inputs.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })

  test('admin view site link navigates to homepage', async ({ page }) => {
    const viewSite = page.locator('text=View site')
    await expect(viewSite).toBeVisible()
    await viewSite.click()
    await expect(page).toHaveURL('/')
  })
})
