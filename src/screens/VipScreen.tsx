import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { Card, Gradient, SectionHeader } from '../features/visual';
import { emailLink, whatsappLink } from '../shared/contact';
import { vipServices } from '../shared/vip-data';
import { brand } from '../theme/palette';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { CheckIcon } from '../ui/icons';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';

export function VipScreen() {
  const { dict, locale, colors } = useSettings();
  const layout = useLayout();
  const vip = dict.vip;
  const whatsapp = whatsappLink(vip.message);
  const email = emailLink(vip.ctaTitle);
  const steps = [vip.steps.tell, vip.steps.plan, vip.steps.enjoy];

  return (
    <Screen maxWidth={layout.pageWidth}>
      <Gradient
        colors={[brand.nightSoft, brand.night, brand.nightDark]}
        style={styles.hero}
      >
        <AppText variant="caption" color={brand.goldLight} style={styles.eyebrow}>
          {vip.eyebrow}
        </AppText>
        <AppText variant="title" color="#FFFFFF">
          {vip.title}
        </AppText>
        <AppText variant="body" color="#FFFFFFCC">
          {vip.intro}
        </AppText>
      </Gradient>

      <Section>
        <SectionHeader title={vip.servicesLabel} />
        <Grid columns={layout.columns(320)}>
          {vipServices.map(service => (
            <View key={service.id} style={styles.item}>
              <Card style={styles.service}>
                <AppText variant="subheading" color={colors.heading}>
                  {service.title[locale]}
                </AppText>
                <AppText variant="body" muted>
                  {service.body[locale]}
                </AppText>
                <AppText variant="label" style={styles.includes}>
                  {vip.includes}
                </AppText>
                {service.includes.map((line, i) => (
                  <View key={i} style={styles.line}>
                    <CheckIcon color={colors.action} size={16} />
                    <AppText variant="caption" style={styles.flex}>
                      {line[locale]}
                    </AppText>
                  </View>
                ))}
              </Card>
            </View>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionHeader title={vip.howTitle} />
        {steps.map((step, i) => (
          <View key={step.title} style={styles.step}>
            <View style={[styles.number, { backgroundColor: colors.action }]}>
              <AppText variant="label" color={colors.actionText}>
                {i + 1}
              </AppText>
            </View>
            <View style={styles.flex}>
              <AppText variant="label">{step.title}</AppText>
              <AppText variant="body" muted>
                {step.body}
              </AppText>
            </View>
          </View>
        ))}
      </Section>

      <Section>
        <Card style={styles.cta}>
          <AppText variant="heading" color={colors.heading}>
            {vip.ctaTitle}
          </AppText>
          <AppText variant="body" muted>
            {vip.ctaBody}
          </AppText>
          {!!whatsapp && (
            <Button
              style={styles.button}
              label={vip.ctaWhatsapp}
              onPress={() => Linking.openURL(whatsapp)}
            />
          )}
          {!!email && (
            <Button
              style={styles.button}
              variant="secondary"
              label={vip.ctaEmail}
              onPress={() => Linking.openURL(email)}
            />
          )}
        </Card>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  hero: { borderRadius: 22, padding: 22, gap: 10 },
  eyebrow: { fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  item: { marginBottom: 16 },
  service: { padding: 16, gap: 6 },
  includes: { marginTop: 8 },
  line: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  step: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: { padding: 18, gap: 6 },
  button: { marginTop: 12 },
});
