import { test, expect } from '@playwright/test'

test.describe('Kanban Board', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('page load shows three columns', async ({ page }) => {
    await expect(page.getByText('TODO')).toBeVisible()
    await expect(page.getByText('IN PROGRESS')).toBeVisible()
    await expect(page.getByText('READY')).toBeVisible()
  })

  test('can create a task in TODO column', async ({ page }) => {
    await page.getByLabel('Add task to TODO').click()
    await page.getByLabel('Task title').fill('My new task')
    await page.getByLabel('Tags, comma separated').fill('urgent')
    await page.getByText('Add').click()
    await expect(page.getByText('My new task')).toBeVisible()
    await expect(page.getByText('urgent')).toBeVisible()
  })

  test('can move a task to next column via button', async ({ page }) => {
    // Create task in TODO
    await page.getByLabel('Add task to TODO').click()
    await page.getByLabel('Task title').fill('Move me')
    await page.getByText('Add').click()

    // Click → to move to IN PROGRESS
    await page.getByLabel('Move to next column').click()
    const inProgressColumn = page.locator('[aria-label="IN PROGRESS tasks"]')
    await expect(inProgressColumn.getByText('Move me')).toBeVisible()
  })

  test('can delete a task', async ({ page }) => {
    await page.getByLabel('Add task to TODO').click()
    await page.getByLabel('Task title').fill('Delete me')
    await page.getByText('Add').click()
    await expect(page.getByText('Delete me')).toBeVisible()

    await page.getByLabel('Delete task').click()
    await expect(page.getByText('Delete me')).not.toBeVisible()
  })

  test('tasks persist after page reload', async ({ page }) => {
    await page.getByLabel('Add task to TODO').click()
    await page.getByLabel('Task title').fill('Persistent task')
    await page.getByText('Add').click()
    await expect(page.getByText('Persistent task')).toBeVisible()

    await page.reload()
    await expect(page.getByText('Persistent task')).toBeVisible()
  })
})
