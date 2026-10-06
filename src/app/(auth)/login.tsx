import { Link } from 'expo-router';
import { useState } from 'react';

import { AuthForm } from '@/components/auth-form';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = email.trim() !== '' && password !== '';

  return (
    <AuthForm
      title="Connexion"
      subtitle="Content de vous revoir."
      footer={
        <>
          <ThemedText type="small" themeColor="textSecondary">
            Pas encore de compte ?
          </ThemedText>
          <Link href="/register" replace>
            <ThemedText type="linkPrimary">Créer un compte</ThemedText>
          </Link>
        </>
      }>
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
        placeholder="Votre mot de passe"
        autoComplete="current-password"
        textContentType="password"
        secureTextEntry
      />
      <Button title="Se connecter" disabled={!canSubmit} onPress={() => signIn(email.trim())} />
    </AuthForm>
  );
}
