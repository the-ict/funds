import { ArrowLeftRight, BarChart3, LayoutDashboard, Settings, Wallet } from "lucide-react";

const menuItems = [
    { id: 'dashboard', label: 'Asosiy', icon: LayoutDashboard },
    { id: 'cashflow', label: 'Pul oqimi', icon: Wallet },
    { id: 'transactions', label: 'Amallar', icon: ArrowLeftRight },
    { id: 'reports', label: 'Hisobotlar', icon: BarChart3 },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
];

export { menuItems }