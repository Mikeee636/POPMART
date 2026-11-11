import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  UserX,
  UserCheck,
  Award
} from 'lucide-react';
import { formatIDR } from '../utils/formatters';
import { UserModal } from '../components/modals/UserModal';
import { UserDetailModal } from '../components/modals/UserDetailModal';

export const UserManagement = () => {
  const { users, deleteUser, toggleUserStatus } = useStore();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState(null);

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.phone && u.phone.includes(search));
      const matchRole = roleFilter === 'all' || u.role?.toLowerCase() === roleFilter.toLowerCase();
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const handleOpenAdd = () => {
    setSelectedUserForEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUserForEdit(user);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (user) => {
    setSelectedUserForDetail(user);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Yakin ingin menghapus akun pengguna "${user.name}"?`)) {
      deleteUser(user.id);
    }
  };

  const roleBadges = {
    admin: 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900',
    customer: 'bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-white">
              Manajemen Pengguna & Kolektor
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Kelola data member VIP, pelanggan, staf gudang, dan administrator sistem
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm transition self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>

      {/* KPI mini-cards - Monochrome */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-[11px] font-semibold text-zinc-400">Total Pengguna</div>
          <div className="text-xl font-black text-zinc-950 dark:text-white mt-1">{users.length} Akun</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-[11px] font-semibold text-zinc-400">Pelanggan Aktif</div>
          <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
            {users.filter(u => u.status === 'active' && u.role?.toLowerCase() === 'customer').length} Customer
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-[11px] font-semibold text-zinc-400">Akun Admin</div>
          <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 mt-1">
            {users.filter(u => u.role?.toLowerCase() === 'admin').length} Admin
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="text-[11px] font-semibold text-zinc-400">Akun Diblokir</div>
          <div className="text-xl font-black text-zinc-400 mt-1">
            {users.filter(u => u.status === 'banned').length} Akun
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, nomor HP..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <option value="all">Semua Peran (Role)</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
            >
              <option value="all">Semua Status Akun</option>
              <option value="active">Aktif</option>
              <option value="banned">Diblokir (Banned)</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50/50 dark:bg-zinc-900/50">
                <th className="py-3 px-4">Pengguna & Kontak</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Total Belanja</th>
                <th className="py-3 px-4">Pesanan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/70">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-400">
                    Tidak ada akun pengguna yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 transition">
                    <td className="py-3 px-4">
                      <div className="min-w-0">
                        <div className="font-bold text-zinc-950 dark:text-white text-sm">
                          {u.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {u.email} • {u.phone || '-'}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                          roleBadges[u.role] || roleBadges.customer
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-zinc-950 dark:text-white text-sm">
                      {formatIDR(u.totalSpent || 0)}
                    </td>
                    <td className="py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400">
                      {u.orderCount || 0} order
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          u.status === 'active'
                            ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                            : 'bg-zinc-200 text-zinc-500 line-through dark:bg-zinc-900'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.status === 'active' ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-400'
                          }`}
                        ></span>
                        {u.status === 'active' ? 'Aktif' : 'Diblokir'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenDetail(u)}
                          title="Lihat Riwayat & Profil"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(u)}
                          title="Edit Pengguna"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          title={u.status === 'active' ? 'Blokir Pengguna' : 'Buka Blokir'}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                        >
                          {u.status === 'active' ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(u)}
                          title="Hapus Pengguna"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedUserForEdit}
      />

      {/* User Detail & Purchase History Modal */}
      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUserForDetail}
      />
    </div>
  );
};
