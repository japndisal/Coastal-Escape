import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Hr,
  Section,
  Row,
  Column,
} from '@react-email/components';

interface TicketEmailProps {
  booking: {
    bookingRef: string;
    userEmail: string;
    userName: string;
    token: string;
    travelDate?: string;
    guests?: number;
    totalAmount?: number;
  };
  packageData: {
    title: string;
    destination: string;
  };
}

export function TicketEmail({ booking, packageData }: TicketEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#F5F0E8', fontFamily: 'Montserrat, Arial, sans-serif', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Logo */}
          <Text style={{ fontSize: '28px', fontWeight: 800, color: '#2C2C2A', letterSpacing: '-1px', marginBottom: '4px' }}>
            COASTAL<span style={{ color: '#378ADD' }}>.</span> escape
          </Text>
          <Text style={{ fontSize: '16px', color: '#378ADD', fontWeight: 600, marginTop: 0 }}>
            Your trip is confirmed!
          </Text>

          <Hr style={{ borderColor: '#D3D1C7', margin: '24px 0' }} />

          <Text style={{ fontSize: '14px', color: '#5F5E5A', lineHeight: '1.6' }}>
            Hi {booking.userName}, your booking for <strong>{packageData.title}</strong> is confirmed.
            We can&apos;t wait to take you to {packageData.destination}!
          </Text>

          {/* Ticket block */}
          <Section style={{ background: '#2C2C2A', borderRadius: '16px', padding: '24px', marginTop: '24px' }}>
            <Row>
              <Column>
                <Text style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#888780', textTransform: 'uppercase', margin: '0 0 4px' }}>
                  Trip
                </Text>
                <Text style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
                  {packageData.title}
                </Text>

                <Text style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#888780', textTransform: 'uppercase', margin: '0 0 4px' }}>
                  Destination
                </Text>
                <Text style={{ fontSize: '14px', color: '#D3D1C7', margin: '0 0 16px' }}>
                  {packageData.destination}
                </Text>

                <Text style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#888780', textTransform: 'uppercase', margin: '0 0 4px' }}>
                  Booking Reference
                </Text>
                <Text style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 16px', fontFamily: 'monospace' }}>
                  {booking.bookingRef}
                </Text>

                <Text style={{ fontSize: '11px', letterSpacing: '0.5px', color: '#888780', textTransform: 'uppercase', margin: '0 0 4px' }}>
                  Token
                </Text>
                <Text style={{ fontSize: '12px', color: '#85B7EB', fontFamily: 'monospace', wordBreak: 'break-all', margin: 0 }}>
                  {booking.token}
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: '#D3D1C7', margin: '32px 0 24px' }} />

          <Text style={{ fontSize: '11px', color: '#888780', textAlign: 'center', margin: 0 }}>
            Questions? Reply to this email or visit coastalescape.com
          </Text>
          <Text style={{ fontSize: '11px', color: '#888780', textAlign: 'center', margin: '4px 0 0' }}>
            © {new Date().getFullYear()} Coastal Escape. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
