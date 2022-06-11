const fs = require('fs');
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
const contract = require('../utils/NFTMinterContract');

exports.getAllNFTs = async(req, res, next) => {
    try {

        const NFTs = await contract.fetchNFTs();
        const data = [];
        for(let i = 0; i < NFTs.length; ++ i) {
            const owner = await contract.ownerOf(i + 1);
            data.push({
                id: i + 1,
                type: NFTs[i].fileType,
                tokenURI: NFTs[i].tokenURI,
                content: NFTs[i].content,
                owner: owner,
            });
        }

        res.status(200).json({
            data
        });
        
    } catch (error) {
        next(error);
    }

};

exports.getNFT = async(req, res, next) => {
    try {
        const nft = await contract.fetchNFT(req.params.id);
        const owner = await contract.ownerOf(req.params.id);
        const data = {
            id: req.params.id,
            type: nft.fileType,
            tokenURI: nft.tokenURI,
            content: nft.content,
            owner: owner,
        };
        
        res.status(200).json({
            data
        });
        
    } catch (error) {
        next(error);
    }

};

exports.mintNFT = async(req, res, next) => {
    try {
        const filetype = req.file.mimetype.substr(0, 5);
        const file = fs.readFileSync(req.file.path);
        
        if(filetype == 'image') {
            const fileBuffer = new Buffer.alloc(req.file.size, file);
            ipfs.files.add(fileBuffer, async (err, files) => {
                if (err) {
                    res.status(404).json({
                        message: 'uploading to ipfs failed',
                        err,
                    });
                }
                await contract.safeMintImage(req.headers.wallet_address, files[0].path);
                res.status(200).json({
                    status: 'success',
                });
            });
        } else {
            await contract.safeMintText(req.headers.wallet_address, file.toString());
            res.status(200).json({
                status: 'success',
            });
        }
    } catch (error) {
        next(error);
    }

};
