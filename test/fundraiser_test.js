const FundraiserContract = artifacts.require("Fundraiser"); //This tells us were going to be working with the fundraiser contract

contract("Fundraiser", accounts => {  //using contract
    let fundraiser;
    const name = "Beneficiary Name";
    const url = "benificiaryname.org";
    const imageURL = "https://placekitten.com/600/350";
    const description = "Beneficiary description";
    const beneficiary = accounts[1];
    const owner = accounts[0]

    describe("initialization", () => {
        beforeEach (async () => {
            fundraiser = await FundraiserContract.new(name, url, imageURL, description, beneficiary, owner);
        });
            it("gets the beneficiary name", async() => {
                const actual = await fundraiser.name()
                assert.equal(actual, name, "names should match");
             });

            it("gets the beneficiary url", async () => {
                const actual = await fundraiser.url();
                assert.equal(actual, url, "url should match")
            });

            it("gets the beneficiary imarge url", async () => {
                const actual = await fundraiser.imageURL();
                assert.equal(actual, imageURL, "imageURL should match");
            });

            it("gets the beneficiary description", async() => {
                const actual = await fundraiser.description();
                assert.equal(actual, description, "description should match");
            });

            it("gets the beneficiary", async() => {
                const actual = await fundraiser.beneficiary();
                assert.equal(actual, beneficiary, "benificiary address should match")
            });

            it("gets the beneficiary", async() => {
                const actual = await fundraiser.owner();
                assert.equal(actual, owner, "bios should match");
            });


    });
    describe("setBeneficiary", () => {
        const newBenificiary = accounts[2];

        it("updated beneficiary when called by owner account", async () => {
            await fundraiser.setBeneficiary(newBenificiary, {from: owner});
            const actualBeneficiary = await fundraiser.beneficiary();
            assert.equal(actualBeneficiary, newBenificiary, "beneficiaries should match")

        });

        it("throws an error when called from a non-ower account", async () => {
            try {
                await fundraiser.setBeneficiary(newBenificiary, {from: accounts[3]});
                assert.fail("withdraw was not restricted to owners")
            } catch (err) {
                const expectedError = "Ownable: caller is not the owner"
                const actualError = err.reason;
                assert.equal(actualError, expectedError, "should not be permitted")
            }
        })
    });
});