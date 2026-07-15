import { Page } from '@playwright/test';

export async function addTodo(page: Page, todoText: string) {
  const todoInput = page.getByPlaceholder('What needs to be done?');

  await todoInput.fill(todoText);
  await todoInput.press('Enter');
}