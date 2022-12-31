// SPDX-License-Identifier: MIT
pragma solidity >=0.5.22 <0.9.0;

contract  salary{
    address payable[] public emp;
    address payable public manager;

    constructor() {
        manager = payable(msg.sender);
    }

    receive() external payable {}
    
    function registerEmployee(address _emaddress) public {
        for (uint256 j = 0; j < emp.length; j++) {
            if (emp[j] == _emaddress) {
                revert("You have already registered");
            }
        }
        emp.push(payable(_emaddress));
    }

    function transferSalary() public payable {
        require(msg.sender == manager, "You are not the manager");
        for (uint256 i = 0; i < emp.length; i++) {
            emp[i].transfer(msg.value);
        }
        emp = new address payable[](0);
    }

    function getEmployee() public view returns (address payable[] memory) {
        return emp;
    }
}


// Address of contract: 0x17fe67353969272DdDa9caf150D4F66b0440E646
