import { test, expect } from '@playwright/test';
import { addTodo } from '../helpers/todoHelper';


test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

/* Exercise 1 – Open the application
Write a test that:
Opens the TodoMVC page
baseURL:https://demo.playwright.dev/todomvc
Verifies the title contains "Todo"
Concepts practiced:
page.goto()
expect()
Page title assertion */

test('Open the application', async ({ page }) => {
  await expect(page).toHaveTitle(/Todo/);
});

/* Exercise 2 – Add one todo
Add:
Learn Playwright
Verify:
the item exists
there is exactly one todo */
test('Add one todo', async ({ page }) => {
  await addTodo(page, 'Learn Playwright');

  await expect(page.getByText('Learn Playwright')).toBeVisible();
});
    //await expect(page.getByTestId('Learn Playwright')).toHaveCount(1);


/* Exercise 3 – Add multiple todos
Learn Playwright
Learn TypeScript
Learn API Testing
Verify: count == 3
*/
test('Add multiple todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  const todos = [
    'Learn Playwright',
    'Learn TypeScript',
    'Learn API Testing',
  ];

  const todoInput = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.locator('.todo-list li');

  for (const todo of todos) {
    await todoInput.fill(todo);
    await todoInput.press('Enter');
  }

  await expect(todoItems).toHaveCount(todos.length);
  await expect(todoItems).toHaveText(todos);
  const secondToDoCheckBox = page.getByRole('checkbox').nth(2);
  await secondToDoCheckBox.check()
  const firstToDoCheckBox = page.getByRole('checkbox').nth(1);
  const thirdToDoCheckBox = page.getByRole('checkbox').nth(3);
  await firstToDoCheckBox.uncheck()
  await thirdToDoCheckBox.uncheck()

});


/*Complete a todo
Mark the first item as completed.
Verify:
checkbox is checked
item has completed state */

test('Complete a todo', async ({ page }) => {
  // Arrange
  const todoInput = page.getByPlaceholder('What needs to be done?');
  const todoCheckbox = page.getByRole('checkbox').first();
  const todoItem = page.locator('.todo-list li').first();

  // Act
  await todoInput.fill('Learn Playwright');
  await todoInput.press('Enter');

  await todoCheckbox.check();

  // Assert
  await expect(todoCheckbox).toBeChecked();
  await expect(todoItem).toHaveClass(/completed/);
});

/*Delete a todo */

test('Delete a todo', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?');
  await todoInput.fill('Delete a todo');
  await todoInput.press('Enter');
  const todo = page.locator('.todo-list li').filter({
  hasText: 'Delete a todo',});
  await todo.hover();
  await todo.locator('.destroy').click();
  await expect(todo).toHaveCount(0);  
});