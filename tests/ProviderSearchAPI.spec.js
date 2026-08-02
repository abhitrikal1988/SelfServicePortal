import { test, expect, request } from '@playwright/test';

const PCPPayload = {
  CmsPlanId: "H2694001000",
  NewLocation: "Southborough,MA,01772",
    PageName: "PCP",
    BusinessId: "110",
    EnrollmentDate: "09/01/2026",
    PcpOnly : true,
    Location : "Southborough, MA 01772, USA",
    Longitude : "-71.53678599999999",
    Latitude : "42.3092759",
    Miles : "10",
    __RequestVerificationToken: "CfDJ8PeNyKHKrvVMudBEUnxljphJH_ewNC_n3Rjx9pgsHLNUTjfrVKVjATFhB4yi_X2XyC3qVkeW3ZpIJp0YLonR0SQncpXjhIQw3Y-WsLds2RMBONg0Is3AnPovYgBVJMEYwI_piDROzSTeRvkoKAi1rY0"

}

test('Validating FIND PCP API', async ({ browser, page }) => {

  const apicontext = await request.newContext();
  const response = await apicontext.get('https://nhconnect.eternalhealth.com/Provider/PublicPcpSearch?mode=E&planId=H2694001000&planName=&planYear=2026&enrollmentDate=09%2F01%2F2026&culture=en');
  expect(response.ok()).toBeTruthy();
})

test.only('Validating Provider Search API', async ({ browser, page }) => {

  const apicontext = await request.newContext();
  const response = await apicontext.post('https://nhconnect.eternalhealth.com/Provider/SearchProviderList', {
    data: PCPPayload
  });
  expect(response.ok()).toBeTruthy();
})


