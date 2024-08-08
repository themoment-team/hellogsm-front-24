import { SearchIcon } from 'admin/assets';

import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  Button,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

const FilterBar = () => {
  const searchApplication = () => {};

  return (
    <div className={cn('flex', 'items-center', 'justify-between', 'w-full')}>
      <div className={cn('flex', 'items-center')}>
        <Input
          icon={<SearchIcon />}
          width="large"
          placeholder="지원자  명, 중학교 명, 지원자 연락처 검색"
          onIconClick={searchApplication}
        />

        <div className={cn('w-px', 'h-6', 'bg-slate-200', 'mx-5')} />

        <div className={cn('flex', 'gap-2')}>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="전형 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전형선택">전형선택</SelectItem>
              <SelectItem value="일반전형">일반전형</SelectItem>
              <SelectItem value="특별전형">특별전형</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="서류 제출 여부" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="제출전">제출 전</SelectItem>
              <SelectItem value="제출완료">제출 완료</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost">필터 초기화</Button>
        </div>
      </div>

      <div className={cn('flex', 'gap-2')}>
        <Button>수험표 출력</Button>
        <Button>Excel 다운</Button>
      </div>
    </div>
  );
};

export default FilterBar;
