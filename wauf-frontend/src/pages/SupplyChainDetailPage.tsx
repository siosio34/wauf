import { Flex, Img, SimpleGrid, Text } from "@chakra-ui/react";
import BackIcon from "../assets/images/back.png";
import SupplyLogo from "../assets/images/supply-logo.png";

import { ScrollRestoration, useNavigate } from "react-router-dom";

import { useProductSupply } from "../queries";

export default function SupplyChainDetailPage() {
  const navigate = useNavigate();
  const query = useProductSupply();

  const supplyChainLogs = query.data?.supplyChainLogs || [];

  const logImageURLS = [
    "https://i.imgur.com/FHZQWLV.png",
    "https://i.imgur.com/Z1vcw3I.png",
    "https://i.imgur.com/j9Vi77n.png",
    "https://i.imgur.com/4TJ1Mi9.png",
    "https://i.imgur.com/yIgCzfP.png",
    "https://i.imgur.com/bib9nef.png",
    "https://i.imgur.com/sg8QHih.png",
    "https://i.imgur.com/RC1soB0.png",
  ];

  return (
    <Flex px="208px" direction={"column"}>
      <ScrollRestoration />
      <Img
        onClick={() => navigate(-1)}
        cursor={"pointer"}
        width={"40px"}
        height={"40px"}
        src={BackIcon}
      />
      <Flex mt="32px" gap="24px">
        <Img width="130px" height={"130px"} src={SupplyLogo} />
        <Flex py="8px" direction={"column"}>
          <Text fontWeight={700} fontSize="24px" color="#f3f6fc">
            FootFab
          </Text>
          <Text mt="4px" fontWeight={300} fontSize="14px" color="#9DA3B6">
            Material Sourcing｜🇺🇸 USA
          </Text>
          <Text mt="24px" fontWeight={300} fontSize="24px" color="#9DA3B6">
            FootFab, a fictional company based in the United States,
            collaborates with Nike during the material sourcing stage. They
            specialize in providing high-quality synthetic fabrics for
            sportswear manufacturing.
          </Text>
        </Flex>
      </Flex>

      <Text mt="64px" fontWeight={600} fontSize="20px" color="#f3f6fc">
        Products participating in distribution
      </Text>

      <SimpleGrid
        mt="24px"
        mb="48px"
        rowGap={"52px"}
        columnGap={"24px"}
        w="100%"
        columns={4}
      >
        {supplyChainLogs.map((log: any, index) => (
          <Card
            key={log.id}
            title={log.name}
            content={log.name.split(" ")[0]}
            url={logImageURLS[index]}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

interface CardProps {
  title?: string;
  content?: string;
  url?: string;
}

function Card(props: CardProps) {
  const {
    title = "Nike Air Force 1 Low Blue Cap Obsidian Gum",
    content = "Nike",
    url = "https://i.imgur.com/FHZQWLV.png",
  } = props;

  return (
    <Flex direction={"column"}>
      <Img aspectRatio={1 / 1} borderRadius={"20px"} w="100%" src={url} />
      <Text mt="16px" fontWeight={600} fontSize="20px" color="#f3f6fc">
        {title}
      </Text>
      <Text mt="8px" fontWeight={300} fontSize="14px" color="#9DA3B6">
        {content}
      </Text>
    </Flex>
  );
}
