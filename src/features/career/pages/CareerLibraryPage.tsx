import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowLeft, Briefcase, ChevronDown, ChevronUp, Star, Filter, X } from 'lucide-react';
import careerLibrary from '../../../data/career/careerLibrary.json';

/** Department icon colors */
const DEPT_COLORS: Record<string, string> = {
  DEPT_BUMA: '#3B82F6',
  DEPT_CRAR: '#EC4899',
  DEPT_EDHU: '#F59E0B',
  DEPT_ENMO: '#6366F1',
  DEPT_HELI: '#10B981',
  DEPT_HOTR: '#F97316',
  DEPT_LAPO: '#8B5CF6',
  DEPT_MECO: '#EF4444',
  DEPT_SCRE: '#14B8A6',
  DEPT_SKTR: '#78716C',
  DEPT_SOIM: '#06B6D4',
  DEPT_SPWE: '#22C55E',
  DEPT_SUEN: '#84CC16',
  DEPT_TEDI: '#2DA8FF',
};

interface LocationState {
  recommendedDepartments?: string[];
}

export const CareerLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Recommended departments from assessment (passed via router state)
  const locState = location.state as LocationState | null;
  const recommendedDeptIds = locState?.recommendedDepartments || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(() => {
    // Auto-expand recommended departments
    return new Set(recommendedDeptIds.slice(0, 2));
  });
  const [filterDept, setFilterDept] = useState<string | null>(null);

  // Sort departments: recommended first, then alphabetical
  const sortedDepartments = useMemo(() => {
    const deps = [...careerLibrary.departments];
    deps.sort((a, b) => {
      const aRec = recommendedDeptIds.indexOf(a.id);
      const bRec = recommendedDeptIds.indexOf(b.id);
      if (aRec !== -1 && bRec !== -1) return aRec - bRec;
      if (aRec !== -1) return -1;
      if (bRec !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
    return deps;
  }, [recommendedDeptIds]);

  // Filter and search
  const filteredDepartments = useMemo(() => {
    let deps = sortedDepartments;

    if (filterDept) {
      deps = deps.filter(d => d.id === filterDept);
    }

    if (!searchQuery.trim()) return deps;

    const q = searchQuery.toLowerCase();
    return deps
      .map(dept => {
        const matchedCategories = dept.categories
          .map(cat => {
            const matchedProfessions = cat.professions.filter(p =>
              p.title.toLowerCase().includes(q) ||
              cat.name.toLowerCase().includes(q) ||
              dept.name.toLowerCase().includes(q)
            );
            if (matchedProfessions.length > 0 || cat.name.toLowerCase().includes(q)) {
              return { ...cat, professions: matchedProfessions.length > 0 ? matchedProfessions : cat.professions };
            }
            return null;
          })
          .filter(Boolean) as typeof dept.categories;

        if (matchedCategories.length > 0 || dept.name.toLowerCase().includes(q)) {
          return { ...dept, categories: matchedCategories.length > 0 ? matchedCategories : dept.categories };
        }
        return null;
      })
      .filter(Boolean) as typeof sortedDepartments;
  }, [sortedDepartments, searchQuery, filterDept]);

  const toggleDept = (id: string) => {
    setExpandedDepts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalProfessions = careerLibrary.departments.reduce(
    (sum, d) => sum + d.categories.reduce((s, c) => s + c.professions.length, 0), 0
  );

  return (
    <div className="career-library-page" style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 600,
            padding: 0, marginBottom: '16px',
          }}
        >
          <ArrowLeft size={16} /> Back to Results
        </button>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--dark)', margin: 0 }}>
          <Briefcase size={28} style={{ verticalAlign: 'middle', marginRight: '10px', color: 'var(--primary)' }} />
          Career Library
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginTop: '8px' }}>
          Explore <strong>{totalProfessions} professions</strong> across{' '}
          <strong>{careerLibrary.departments.length} departments</strong>. 
          {recommendedDeptIds.length > 0 && (
            <> Your recommended departments are highlighted with a <Star size={14} style={{ verticalAlign: 'middle', color: '#F59E0B' }} />.</>
          )}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: '260px',
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '12px 16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search professions, categories, or departments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent', fontSize: '0.95rem',
              color: 'var(--dark)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
            >
              <X size={16} color="var(--text-muted)" />
            </button>
          )}
        </div>

        {/* Department filter dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            value={filterDept || ''}
            onChange={(e) => setFilterDept(e.target.value || null)}
            style={{
              padding: '12px 16px',
              paddingRight: '36px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '10px',
              fontSize: '0.95rem',
              color: 'var(--dark)',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="">All Departments</option>
            {careerLibrary.departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <Filter size={14} color="var(--text-muted)" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Results count */}
      {searchQuery && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Found {filteredDepartments.length} department{filteredDepartments.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </p>
      )}

      {/* Department Cards */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredDepartments.map(dept => {
          const isRecommended = recommendedDeptIds.includes(dept.id);
          const isExpanded = expandedDepts.has(dept.id);
          const color = DEPT_COLORS[dept.id] || '#6B7280';
          const profCount = dept.categories.reduce((s, c) => s + c.professions.length, 0);

          return (
            <div
              key={dept.id}
              style={{
                border: `1px solid ${isRecommended ? color + '40' : 'var(--border-light)'}`,
                borderRadius: '14px',
                overflow: 'hidden',
                background: isRecommended ? color + '05' : 'var(--bg-card)',
                transition: 'box-shadow 0.2s',
              }}
            >
              {/* Department Header */}
              <button
                onClick={() => toggleDept(dept.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '18px 20px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: color + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Briefcase size={20} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--dark)' }}>
                      {dept.name}
                    </span>
                    {isRecommended && <Star size={16} color="#F59E0B" fill="#F59E0B" />}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {dept.categories.length} categories · {profCount} professions
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp size={20} color="var(--text-muted)" />
                ) : (
                  <ChevronDown size={20} color="var(--text-muted)" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border-light)' }}>
                  {dept.categories.map(cat => (
                    <div key={cat.id} style={{ marginTop: '16px' }}>
                      <h4 style={{
                        fontSize: '0.95rem', fontWeight: 700, color: color,
                        marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: color, display: 'inline-block',
                        }} />
                        {cat.name}
                        <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          ({cat.professions.length})
                        </span>
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {cat.professions.map(prof => (
                          <span
                            key={prof.id}
                            style={{
                              padding: '6px 14px',
                              background: 'var(--surface, #f1f5f9)',
                              border: '1px solid var(--border-light)',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              color: 'var(--dark)',
                              fontWeight: 500,
                            }}
                          >
                            {prof.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredDepartments.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '48px 20px',
          color: 'var(--text-muted)', fontSize: '1.1rem',
        }}>
          <Search size={48} strokeWidth={1.2} style={{ marginBottom: '12px', opacity: 0.4 }} />
          <p>No careers found matching "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(''); setFilterDept(null); }}
            style={{
              marginTop: '12px', padding: '10px 24px',
              background: 'var(--primary)', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};
