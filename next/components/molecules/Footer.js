import {
  Box,
  HStack,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "../atoms/Link";
import BDLogoFooterImage from "../../public/img/logos/bd_logo_footer";
import YoutubeIcon from "../../public/img/icons/youtubeIcon";
import TwitterIcon from "../../public/img/icons/twitterIcon";
import DiscordIcon from "../../public/img/icons/discordIcon";
import GithubIcon from "../../public/img/icons/githubIcon";
import LinkedinIcon from "../../public/img/icons/linkedinIcon";
import WhatsAppIcon from "../../public/img/icons/whatsAppIcon";
import TelegramIcon from "../../public/img/icons/telegramIcon";

function LinkVStack({ title, children }) {
  return (
    <VStack spacing={5} alignItems="flex-start">
      <Text 
        color="#FFFFFF"
        fontFamily="Ubuntu"
        fontSize="15px"
        fontWeight="400"
        letterSpacing="0.5px"
      >
        {title}
      </Text>
      {children}
    </VStack>
  );
}

function SocialLink({ title, href, children }) {
  return (
    <Link fontFamily="Ubuntu" fontWeigth="300" letterSpacing="0.3px" color="white" href={href} target="_blank">
      <HStack>
        {children}
        <Text>{title}</Text>
      </HStack>
    </Link>
  );
}

const IconKey = {
  width: "24px",
  height: "24px",
  fill: "#FFF"
}

function FooterLink(props) {
  return <Link fontFamily="Ubuntu" fontWeigth="300" letterSpacing="0.3px" {...props} />;
}

export default function Footer({ pages }) {

  return (
    <VStack 
      backgroundColor="#34A15A"
      position="relative"
      zIndex="10"
      width="100%"
      spacing={0}
    >
      <VStack 
        width="100%"
        padding="40px 24px"
        spacing={10}
      >
        <Stack
          alignItems="flex-start"
          width="100%"
          maxWidth="1264px"
          justifyContent="space-between"
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: 10, lg: 20 }}
        >
          <Box minWidth="200px" height="200px" position="relative">
            <BDLogoFooterImage
              priority
              objectFit="contain"
              layout="fill"
            />
          </Box>

          <Stack
            direction={{ base: "column", lg: "row" }}
            paddingBottom="100px"
            justifyContent="space-around"
            width="100%"
            alignItems="flex-start"
            marginLeft="auto"
            spacing={{ base: 10, lg: 0 }}
          >
            <LinkVStack title="PRODUTOS">
              <FooterLink color="white" href="/dataset">
                Mecanismo de busca
              </FooterLink>
              <FooterLink
                color="white"
                href="https://basedosdados.github.io/mais/" // TODO: ir para "Dados" com filtro BD+
                target="_blank"
              >
                Datalake público
              </FooterLink>
              <FooterLink
                color="white"
                href="https://basedosdados.github.io/mais/access_data_packages/"
                target="_blank"
              >
                Pacotes
              </FooterLink>
            </LinkVStack>

            <LinkVStack title="SERVIÇOS">
              <FooterLink 
                color="white" 
                href="/servicos#Captura de dados"
              >
                Captura de dados
              </FooterLink>
              <FooterLink
                color="white"
                href="/servicos#Análise de dados"
                target="_blank"
              >
                Análise de dados
              </FooterLink>
              <FooterLink
                color="white"
                href="/servicos#Consultoria de dados"
                target="_blank"
              >
                Consultoria de dados
              </FooterLink>
            </LinkVStack>

            <LinkVStack title="TUTORIAIS">
              <FooterLink
                href="/perguntas-frequentes"
                color="white"
                target="_blank"
              >
                Perguntas Frequentes
              </FooterLink>
              <FooterLink
                href="https://basedosdados.github.io/mais/"
                color="white"
                target="_blank"
              >
                Documentação
              </FooterLink>
              <FooterLink
                href="https://medium.com/basedosdados"
                color="white"
                target="_blank"
              >
                Blog
              </FooterLink>
              <SocialLink
                href="https://www.youtube.com/c/BasedosDados/featured"
                color="white"
                target="_blank"
                title="YouTube"
              >
                <YoutubeIcon alt="youtube basedosdados" {...IconKey}/>
              </SocialLink>
            </LinkVStack>

            <LinkVStack title="COMUNIDADE">
              <SocialLink
                href="https://twitter.com/basedosdados"
                title="Twitter"
              >
                <TwitterIcon alt="twitter" {...IconKey}/>
              </SocialLink>
              <SocialLink
                href="https://discord.gg/huKWpsVYx4"
                title="Discord"
              >
                <DiscordIcon alt="discord" {...IconKey}/>
              </SocialLink>
              <SocialLink
                href="https://github.com/basedosdados"
                title="GitHub"
              >
                <GithubIcon alt="github" {...IconKey}/>
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/base-dos-dados/mycompany/"
                title="LinkedIn"
              >
                <LinkedinIcon alt="linkedin" {...IconKey}/>
              </SocialLink>
              <SocialLink
                href="https://chat.whatsapp.com/CLLFXb1ogPPDomCM6tQT22"
                title="WhatsApp"
              >
                <WhatsAppIcon alt="whatsApp" {...IconKey}/>
              </SocialLink>
              <SocialLink
                href="https://t.me/joinchat/OKWc3RnClXnq2hq-8o0h_w"
                title="Telegram"
              >
                <TelegramIcon alt="telegram" {...IconKey}/>
              </SocialLink>
            </LinkVStack>

            <LinkVStack title="INSTITUCIONAL">
              <FooterLink
                href="/quem-somos"
                color="white"
              >
                Quem somos
              </FooterLink>
              <FooterLink
                href="/transparencia"
                color="white"
              >
                Transparência
              </FooterLink>
              <FooterLink
                href="https://info.basedosdados.org/newsletter"
                color="white"
                target="_blank"
              >
                Newsletter
              </FooterLink>
              <FooterLink
                href="https://info.basedosdados.org/carreiras"
                color="white"
                target="_blank"
              >
                Carreiras
              </FooterLink>
              <FooterLink
                href="/contato"
                color="white"
              >
                Contato
              </FooterLink>
              <Link fontWeigth="700" color="white" href="/#support">
                Apoie o projeto
              </Link>
            </LinkVStack>
          </Stack>
        </Stack>

        <VStack spacing={4}>
          <HStack
            fontFamily="Ubuntu"
            fontWeight="300"
            color="white"
            letterSpacing="0.3px"
          >
            <Text>® 2022 Base dos Dados</Text>
            {/* <Text>|</Text> // TODO: Não existem essas páginas ainda!
            <Link color="white">Termos de uso</Link>
            <Text>|</Text>
            <Link color="white">Política de privacidade</Link> */}
          </HStack>
          <Text
            color="white"
            fontSize="10px"
            fontFamily="Ubuntu"
            fontWeight="300"
            letterSpacing="0.2px"
          >
            Ícones adaptados de Freepik e disponíveis em Storyset e
            Flaticon.
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
}