pragma solidity >= 0.8.0;

contract Fundraiser {

    string public name;
    string public url;
    string public imageURL;
    string public description;

    address payable public beneficiary;
    address public custodian;


    constructor(
        string memory _name,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        address payable _beneficiary, // a payable address is
        address _custodian
    )
        public
    {  // The constructor is created th

        name = _name;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        beneficiary = _beneficiary;
        custodian = _custodian;
    }

}