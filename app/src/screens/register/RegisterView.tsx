import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { Container } from "./styles";

// TODO: add keyboard aware
// TODO: add yup validation
// TODO: add icon component
// TODO: add password input
export const RegisterView = () => (
  <Container>
    <Text h4 h4Style={{ fontWeight: "400", marginBottom: 10 }}>
      Nome
    </Text>
    <Input placeholder="Nome Sobrenome" />

    <Text h4 h4Style={{ fontWeight: "400", marginBottom: 10 }}>
      Email
    </Text>
    <Input placeholder="nome.sobrenome@email.com" autoCapitalize="none" />

    <Text h4 h4Style={{ fontWeight: "400", marginBottom: 10 }}>
      Senha
    </Text>
    <Input placeholder="**********" />

    <Button>Cadastrar</Button>
  </Container>
);
