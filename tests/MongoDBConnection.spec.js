import { test, expect } from '../Utils/MongodbFixture';

test('Should fetch data from MongoDB', async ({ page, db }) => {
    const MCPMember = db.collection('MCPMember');

    // Validation: Confirm database updates natively if needed
    const MemberDetails = await MCPMember.findOne({ MCPMember_ID: 24789 });
    console.log('MemberDetails:', MemberDetails);
    expect(MemberDetails?.FirstName).toBe('MBI0A05UQ48_FName');
  });
