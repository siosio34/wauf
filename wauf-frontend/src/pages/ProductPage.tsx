import {
  VStack,
  Text,
  HStack,
  Img,
  Box,
  Flex,
  Stepper,
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Button,
} from "@chakra-ui/react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";

import Shoes from "../assets/images/shoes.png";

import { useEffect, useState } from "react";
import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";

import { gnosis } from "viem/chains";

import {
  prepareWriteContract,
  writeContract,
  connect,
  disconnect,
} from "@wagmi/core";

// http://172.30.1.8:3001/api/biography

// AIzaSyAWv75CHuF4h3Yq-fJrQ0i_QX_r_5MJdT8
// app_staging_00d3ef435cdf6b91a9c7c8e29c17638b - world 코인

// https://id.worldcoin.org/authorize?client_id={app_id}&response_type={code|token|id_token}&redirect_uri={encoded_redirect_url}&state={state_value}&nonce={nonce_value}
import SupplyChainBiographyABI from "../assets/abi/SupplyChainBiography.json";
import { metaMaskConnector } from "../providers/wagmi-provider";
import { toast } from "react-toastify";
import { ScrollRestoration, useNavigate } from "react-router-dom";

import Logo1 from "../assets/images/logo1.png";
import Logo2 from "../assets/images/logo2.png";
import Logo3 from "../assets/images/logo3.png";
import Logo4 from "../assets/images/logo4.png";
import Logo5 from "../assets/images/logo5.png";
import { useBiography } from "../queries";

const WORLD_COID_APP_ID = import.meta.env.VITE_WLD_APP_ID;
const VITE_WALLET_CONNET_ID = import.meta.env.VITE_WALLET_CONNET_ID;

// 라인 그리기 https://stackoverflow.com/questions/51816751/draw-lines-between-multiple-markers-on-google-map-using-java-script

export default function ProductPage() {
  /**
   * 구글맵 연동
   * 상품정보 불러오기
   * 월드코인 인증하기
   */

  return (
    <VStack px="208px" pb="78px">
      <ScrollRestoration />
      <ProductArea />
      <MapArea />
    </VStack>
  );
}

function ProductArea() {
  return (
    <HStack spacing={"24px"} w="100%">
      <Img
        background={"#CBDCEC"}
        borderRadius={"20px"}
        src={Shoes}
        height={"375px"}
        width="375px"
      />
      <Flex my="24px" direction={"column"}>
        <Text fontSize="16px" color="#9DA3B6" fontWeight={600}>
          Nike
        </Text>
        <Text fontSize="24px" color="#F3F6FC" fontWeight={700} mt="8px">
          Nike Air Force 1 Low Blue Cap Obsidian Gum
        </Text>
        <Text fontSize="20px" color="#F3F6FC" fontWeight={600} mt="12px">
          $90
        </Text>
        <Text fontSize="16px" color="#9DA3B6" fontWeight={600} mt="32px">
          Product Details
        </Text>
        <Flex gap="12px" mt="20px">
          <Card title="Style" content="820266-400" />
          <Card title="Release Da te" content="08/10/2016" />
          <Card title="Release Amount" content="200" />
          <Card title="Color" content="BLUECAP/OBSIDIAN-SAIL-GUM LIGHT BROWN" />
        </Flex>
      </Flex>
    </HStack>
  );
}

interface CardProps {
  title: string;
  content: string;
}

function Card(props: CardProps) {
  const { title, content } = props;

  return (
    <Box
      maxWidth={"200px"}
      py="8px"
      px="12px"
      border="1px solid #3c3f47"
      borderRadius={"10px"}
    >
      <Text color="#797E8F" fontSize="14px" fontWeight={400}>
        {title}
      </Text>
      <Text color="#F3F6FC" fontSize="14px" fontWeight={400}>
        {content}
      </Text>
    </Box>
  );
}

// interface Process {
//   country?: string;
//   position?: any;
//   date: string;
//   company: {
//     name: string;
//     description: string;
//     roleSummary: string;
//   };
// }

// const processes: Process[] = [
//   {
//     country: "United States",
//     position: {
//       lng: -122.4194,
//       lat: 37.7749,
//     },
//     date: "2022-02-17 14:59:00",
//     company: {
//       name: "FootFab",
//       description:
//         "FootFab, a fictional company based in the United States, collaborates with Nike during the material sourcing stage. They specialize in providing high-quality synthetic fabrics for sportswear manufacturing.",
//       roleSummary: "Material sourcing and fabrication",
//     },
//   },
//   {
//     country: "Italy",
//     position: {
//       lng: 12.4964,
//       lat: 41.9028,
//     },
//     date: "2022-03-05 09:30:00",
//     company: {
//       name: "Craftman's Leatherworks",
//       description:
//         "Craftman's Leatherworks, owned and operated by Thomas Craftman, is renowned for their expert leather craftsmanship in Italy. They collaborate with Nike during the manufacturing stage to create exquisite leather components for Nike shoes.",
//       roleSummary: "Leather craftsmanship",
//     },
//   },
//   {
//     country: "Malaysia",
//     date: "2022-04-10 13:45:00",
//     position: {
//       lng: 101.6869,
//       lat: 3.139,
//     },
//     company: {
//       name: "SoleTech",
//       description:
//         "SoleTech, a fictional company located in Malaysia, partners with Nike during the manufacturing and assembly stage. They specialize in producing durable rubber compounds for shoe outsoles.",
//       roleSummary: "Manufacturing and assembly",
//     },
//   },
//   {
//     country: "Germany",
//     date: "2022-05-18 16:20:00",
//     position: {
//       lng: 13.405,
//       lat: 52.52,
//     },
//     company: {
//       name: "QualityAssure",
//       description:
//         "QualityAssure, a fictional quality inspection company based in Germany, collaborates with Nike during the quality control and inspection stage. They ensure that Nike shoes meet the highest standards of quality and craftsmanship.",
//       roleSummary: "Quality control and inspection",
//     },
//   },

//   {
//     country: "South Korea",
//     position: {
//       lat: 35.9078,
//       lng: 127.7669,
//     },
//     date: "2022-06-25 11:15:00",
//     company: {
//       name: "TechSole",
//       description:
//         "TechSole, a fictional technology company based in South Korea, partners with Nike during the research and development stage. They specialize in developing innovative shoe technologies for enhanced performance and comfort.",
//       roleSummary: "Research Development",
//     },
//   },
// ];

const logoImageUrl = [Logo5, Logo1, Logo2, Logo3, Logo4];

function MapArea() {
  const query = useBiography();

  const processes = query?.data || [];

  const mintProduct = async () => {
    try {
      await disconnect();
      const connectResult = await connect({
        chainId: gnosis.id,
        connector: metaMaskConnector,
      });
      console.log("connectResult", connectResult);
      const config = await prepareWriteContract({
        abi: SupplyChainBiographyABI.abi,
        chainId: gnosis.id,
        functionName: "mint",
        address: "0x0ecEc64fF6C60d5528AC67B53FE16dDb20e8ED32",
      });
      console.log("config", config);
      const { hash } = await writeContract(config.request);
      toast.success("Successful Purchase!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: null,
      });
    } catch (e) {
      console.log("e", e);
    }
  };

  const onSuccess = async (result: ISuccessResult) => {
    mintProduct();
    /**
     * {merkle_root: '0x03b8d0dce4a5f18187af8f84642d6b3902c0b498bd2b0725b173af0f70fbe2f5', nullifier_hash: '0x0d0b89e9945f883b1119b64595b81da570a1a17babc15627e492d37355b869b1', proof: '0x029d0b7a8dedbdac06373ad0b94e6c6e1b0556215c83ca27…0236a35bf73f7a1231ec6857babe17bf14817055aa59d5d67', credential_type: 'phone'}
     */
    // 지갑 오픈
    // This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
  };

  const [randomUuid, setRandomUuid] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    // random한 스트링 생성
    // 랜덤한 스트링을 생성한다.
    const randomString = Math.random().toString(36).substring(2, 15);
    setRandomUuid(randomString);
  }, []);

  const handleProof = async (result: ISuccessResult) => {
    const reqBody = {
      merkle_root: result.merkle_root,
      nullifier_hash: result.nullifier_hash,
      proof: result.proof,
      credential_type: result.credential_type,
      action: randomUuid,
      signal: "",
    };
    fetch(
      `https://developer.worldcoin.org/api/v1/verify/${WORLD_COID_APP_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    ).then(async (res: Response) => {
      if (res.status == 200) {
        console.log("Successfully verified credential.");
      } else {
        throw (
          new Error("Error: " + (await res.json()).code) ?? "Unknown error."
        );
      }
    });
  };

  const getLatLngPolyline = ({ origin, destination }: any) => [
    { lat: origin.lat, lng: origin.lng },
    { lat: destination.lat, lng: destination.lng },
  ];

  const paths = processes
    .map((item, index) => {
      if (index === processes.length - 1) return null;
      return {
        path: getLatLngPolyline({
          origin: item.position,
          destination: processes[index + 1].position,
        }),
      };
    })
    .filter((item) => item !== null);

  // paths 의 맨 마지막 배열만 제거한다.

  const [highLightIndex, setHighLightIndex] = useState<number>(-1);

  return (
    <Flex w="100%" direction={"column"}>
      <Text
        fontWeight={600}
        fontSize={"20px"}
        color="#F3F6FC"
        mt="54px"
        mb="24px"
      >
        Supply Chain Biography
      </Text>

      <LoadScript
        googleMapsApiKey="AIzaSyAWv75CHuF4h3Yq-fJrQ0i_QX_r_5MJdT8"
        googleMapsClientId="b3152b9eb60ee5f6"
      >
        <GoogleMap
          options={{
            mapId: "b3152b9eb60ee5f6",
            scaleControl: false,
            zoomControl: false,
            panControl: false,
            rotateControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            draggableCursor: null,
            draggingCursor: null,
          }}
          center={{
            lat: 41.9028,
            lng: 12.4964,
          }}
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
          zoom={2}
        >
          {processes.map((item, index) => (
            <MarkerF
              position={{
                lat: item.position.lat,
                lng: item.position.lng,
              }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              animation={highLightIndex === index ? 1 : null}
              onMouseOver={() => setHighLightIndex(index)}
              onMouseOut={() => setHighLightIndex(-1)}
              icon={{
                url: logoImageUrl?.[index] ?? logoImageUrl[0],
              }}
              onClick={() => console.log("item", item)}
              key={index}
            />
          ))}
          {paths.map((item, index) => (
            <PolylineF
              path={item!.path}
              key={index}
              options={{
                strokeOpacity: 1,
                strokeWeight: 2,
                strokeColor: "#5DDC48",
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <Stepper
        colorScheme="#5DDC48"
        gap="24px"
        mt="24px"
        index={5}
        orientation="vertical"
        sx={{
          " .chakra-step__separator": {
            background: "#5DDC48 !important",
            height: "100% !important",
            maxHeight: "100%",
            top: "24px !important",
          },
        }}
      >
        {processes.map((item, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={
                  <Box
                    w="18px"
                    h="18px"
                    borderRadius={"18px"}
                    bgColor="#5DDC48"
                    backgroundImage={logoImageUrl?.[index] ?? logoImageUrl[0]}
                    backgroundSize={"contain"}
                  />
                }
              />
            </StepIndicator>

            <Box
              onClick={() => navigate("/supply")}
              border="1px solid #3C3F47"
              borderRadius={"10px"}
              flexShrink="0"
              p="12px"
              sx={{
                _hover: {
                  cursor: "pointer",
                  borderColor: "#5DDC48",
                },
              }}
            >
              <StepTitle>
                <Text color="#F3F6FC">{item.company.name}</Text>
              </StepTitle>
              <StepDescription>
                <Text color="#9DA3B6">
                  {item.company.name} | {item.country} | 🕒 {item.date}
                </Text>
              </StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <IDKitWidget
        action={randomUuid}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        app_id={WORLD_COID_APP_ID!}
        credential_types={[CredentialType.Phone]}
      >
        {({ open }) => (
          <Button
            width="300px"
            height="48px"
            mt="32px"
            sx={{
              _hover: {
                background: "#5DDC48",
              },
            }}
            onClick={open}
          >
            Get
          </Button>
        )}
      </IDKitWidget>
    </Flex>
  );
}
