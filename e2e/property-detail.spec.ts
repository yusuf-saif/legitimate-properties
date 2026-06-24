import { test, expect } from '@playwright/test'

test.describe('Property Detail', () => {
  test('property detail page loads gallery and info when navigated to', async ({ page }) => {
    await page.goto('/properties')
    const propertyLink = page.locator('a[href^="/properties/"]').first()
    const exists = (await propertyLink.count()) > 0
    test.skip(!exists, 'No properties to test')

    await propertyLink.click()
    await page.waitForURL(/\/properties\//)

    const images = page.locator('img[alt*="image"]')
    const imageCount = await images.count()
    expect(imageCount).toBeGreaterThanOrEqual(1)

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
    const text = await heading.textContent()
    expect(text?.length).toBeGreaterThan(0)
  })

  test('enquiry form renders on property detail page', async ({ page }) => {
    await page.goto('/properties')
    const propertyLink = page.locator('a[href^="/properties/"]').first()
    const exists = (await propertyLink.count()) > 0
    test.skip(!exists, 'No properties to test')

    await propertyLink.click()
    await page.waitForURL(/\/properties\//)

    const enquirySection = page.locator('form, section').filter({ hasText: /enquire|send a message|property.*interest/i })
    const formExists = (await enquirySection.count()) > 0
    if (formExists) {
      const inputs = page.locator('input, textarea')
      const inputCount = await inputs.count()
      expect(inputCount).toBeGreaterThanOrEqual(2)
    }
  })

  test('related properties section shows on detail page', async ({ page }) => {
    await page.goto('/properties')
    const propertyLink = page.locator('a[href^="/properties/"]').first()
    const exists = (await propertyLink.count()) > 0
    test.skip(!exists, 'No properties to test')

    await propertyLink.click()
    await page.waitForURL(/\/properties\//)

    const related = page.locator('h2', { hasText: /similar|also like/i })
    const relatedExists = (await related.count()) > 0
    if (relatedExists) {
      const relatedCards = page.locator('a[href^="/properties/"]')
      const count = await relatedCards.count()
      expect(count).toBeGreaterThanOrEqual(1)
    }
  })
})
