import { expect, test } from './fixtures';

const CLIENT_URL = 'http://localhost:3000';

/** step이 null이면 최종 제출된 원서로 보고 마이페이지에 관련서류 다운로드 영역이 노출된다. */
const submittedOneseo = {
  oneseoId: 1,
  submitCode: 'A-1',
  wantedScreening: 'GENERAL',
  desiredMajors: { firstDesiredMajor: 'SW', secondDesiredMajor: 'AI', thirdDesiredMajor: 'IOT' },
  step: null,
};

test.describe('마이페이지 관련서류 다운로드', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.route('**/api/oneseo/v3/oneseo/me', (route) =>
      route.fulfill({ json: { data: submittedOneseo } }),
    );
    // 새 탭에서 열리는 요청까지 잡기 위해 context 단위로 CDN 파일 응답을 고정한다.
    await context.route('**/*.hwpx', (route) =>
      route.fulfill({ contentType: 'application/haansofthwpx', body: 'hwpx' }),
    );
  });

  test('같은 파일을 반복해서 클릭해도 매번 다운로드를 요청한다', async ({
    page,
    context,
    consoleErrors,
  }) => {
    const fileRequests: string[] = [];
    context.on('request', (request) => {
      if (request.url().endsWith('.hwpx')) fileRequests.push(request.url());
    });

    await page.goto(`${CLIENT_URL}/mypage`);

    const downloadButtons = page.getByRole('button', { name: '다운로드', exact: true });
    await expect(downloadButtons).toHaveCount(3);

    // 1번(유형별 제출서류 안내 파일) 두 번, 3번(제출서류) 한 번
    for (const index of [0, 0, 2]) {
      const before = fileRequests.length;
      await downloadButtons.nth(index).click();
      await expect.poll(() => fileRequests.length).toBe(before + 1);
    }

    await expect(page).toHaveURL(`${CLIENT_URL}/mypage`);
    expect(consoleErrors).toEqual([]);
  });

  test('입학원서 버튼은 출력 페이지로 이동한다', async ({ page }) => {
    await page.goto(`${CLIENT_URL}/mypage`);

    await page.getByRole('button', { name: '다운로드', exact: true }).nth(1).click();

    await expect(page).toHaveURL(`${CLIENT_URL}/print`);
  });
});
