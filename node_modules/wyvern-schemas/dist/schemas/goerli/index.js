"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goerliSchemas = void 0;
const index_1 = require("../ContractRole/index");
const ERC1155_1 = require("../ERC1155");
const ERC20_1 = require("../ERC20");
const index_2 = require("../ERC721/index");
exports.goerliSchemas = [
    ERC20_1.ERC20Schema,
    index_2.ERC721Schema,
    index_2.ERC721v3Schema,
    ERC1155_1.ERC1155Schema,
    index_1.ContractRoleSchema,
];
//# sourceMappingURL=index.js.map