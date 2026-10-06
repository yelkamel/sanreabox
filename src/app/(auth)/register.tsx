import { Link } from 'expo-router';
import { useState } from 'react';

import { AuthForm } from '@/components/auth-form';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = name.trim() !== '' && email.trim() !== '' && password !== '';

  return (
    <AuthForm
      title="Inscription"
      subtitle="Créez votre compte en quelques secondes."
      footer={
        <>
          <ThemedText type="small" themeColor="textSecondary">
            Déjà un compte ?
          </ThemedText>
          <Link href="/login" replace>
            <ThemedText type="linkPrimary">Se connecter</ThemedText>
          </Link>
        </>
      }>
      <Input
        label="Nom"
        value={name}
        onChangeText={setName}
        placeholder="Prénom Nom"
        autoComplete="name"
        textContentType="name"
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="vous@exemple.com"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Input
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        placeholder="Choisissez un mot de passe"
        autoComplete="new-password"
        textContentType="newPassword"
        secureTextEntry
      />
      <Button
        title="Créer mon compte"
        disabled={!canSubmit}
        onPress={() => signUp(name.trim(), email.trim())}
      />
    </AuthForm>
  );
}
