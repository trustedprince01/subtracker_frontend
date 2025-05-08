
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Mail, Calendar } from 'lucide-react';

const ConnectedAccounts = () => {
  const connections = [
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Connected for automatic payments',
      connected: true,
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Receive payment reminders via email',
      connected: true,
      icon: <Mail className="h-5 w-5" />
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      description: 'Sync subscription renewals with calendar',
      connected: false,
      icon: <Calendar className="h-5 w-5" />
    }
  ];

  return (
    <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-xl text-white">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {connections.map((connection) => (
            <div key={connection.id} className="flex items-center justify-between p-3 rounded-lg border border-purple-900/10 hover:border-purple-900/30 transition-colors bg-darkBlue-800/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-darkBlue-800/60">
                  {connection.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{connection.name}</p>
                    <Badge variant={connection.connected ? "default" : "outline"} className={connection.connected ? "bg-green-600/30 text-green-300 border-green-600/30" : "text-gray-400"}>
                      {connection.connected ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{connection.description}</p>
                </div>
              </div>
              <Switch checked={connection.connected} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccounts;
