import { Request, Response, NextFunction} from "express";
import SupplyChainBioGraphy from "../artifacts/contracts/SupplyChainBiography.sol/SupplyChainBiography.json";
import {ethers} from "ethers";
import addr from "../shared/addresses";
import {execute} from "../.graphclient";
import { gql } from '@apollo/client';

interface BioGraphy {
    country : string,
    position : {
        lng: number,
        lat: number
    },
    company: {
        name: string,
        roleSummary: string
    },
    date: string
} 

const getSupplyChainInfos = async (chainId: string) => {
    let endpoint : string;
    let address : string;
    switch (chainId) {
        case '100':
            endpoint = "https://rpc.gnosischain.com/";
            address = addr.GNOSIS.Biography;
            break
        case "1313161555":
            endpoint = "https://testnet.aurora.dev";
            address = addr.AURORA.Biography;
            break
        default:
            endpoint = "https://rpc.gnosischain.com/"
            address = addr.GNOSIS.Biography;
            break
    }
    const provider = new ethers.providers.JsonRpcProvider(endpoint);
    const supplyChain = new ethers.Contract(address, SupplyChainBioGraphy.abi, provider);
    return (await supplyChain.getSupplyChainInfo());
}

const getSupplyChainLogs = async (entity : string) => {
    const queryString = `{
        supplyChainLogs(where: {supplyChain: "${entity}"}, orderBy: blockTimestamp) {
            name
        }
    }`
    const query = gql(queryString);
    const {data} = await execute(query, {});
    return data;
}

const routes = (app) => {
    app.get("/*", async (req : Request, res : Response, next : NextFunction) => {
        next();
        return;
    })

    app.get("/api/biography", async (req : Request, res : Response, next: NextFunction) => {
        try {
            const chainId = req.query.chainID as string;

            const data : BioGraphy[] = []
            const supplyChainInfos = await getSupplyChainInfos(chainId);
    
            supplyChainInfos.forEach((info) => {
                let mock : BioGraphy = {
                    country : "",
                    position : {
                        lng: 0,
                        lat: 0
                    },
                    company: {
                        name: "",
                        roleSummary: ""
                    },
                    date: ""
                };

                mock.position.lat = info.latitude.toNumber();
                mock.position.lng = info.longitude.toNumber();
                mock.company.name = info.entityName.toString();
                mock.country = info.location.toString();
                mock.company.roleSummary = info.action.toString();
                mock.date = new Date(info.timestamp.toNumber() * 1000).toLocaleString('en-GB', { timeZone: 'UTC' });
    
                data.push(mock);
            })
            
            res.json(data);
        } catch (error) {
            next(error);
        }
    })

    app.get('/api/supplyChainLog', async (req : Request, res : Response, next : NextFunction) => {
        const chainId = req.query.chainID as string;
        const entity = req.query.entity as string;
        if (!entity) {
            res.status(400).json({ message: 'entity query parameter is missing'});
            return;
          }
        try {
            const data = await getSupplyChainLogs(entity);
            res.json(data);
        } catch (error) {
            next(error);
        }
    })
}

export default routes;